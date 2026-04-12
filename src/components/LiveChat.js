import React, { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";

const LiveChat = ({ liveChatId }) => {
  const [messages, setMessages] = useState([]);
  const [liveMessage, setLiveMessage] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    if (!liveChatId) return;

    let timeoutId;
    let cancelled = false;

    const fetchMessages = async (pageToken) => {
      const params = new URLSearchParams({
        liveChatId,
        part: "snippet,authorDetails",
        maxResults: "200",
      });
      if (pageToken) params.set("pageToken", pageToken);

      const res = await fetch(`/api/youtube/liveChat/messages?${params}`);
      const json = await res.json();
      if (!json.items) {
        return { items: [], pollingInterval: 10000, nextPageToken: null };
      }
      return {
        items: json.items,
        pollingInterval: json.pollingIntervalMillis || 5000,
        nextPageToken: json.nextPageToken || null,
      };
    };

    const poll = async (pageToken) => {
      let result;
      try {
        result = await fetchMessages(pageToken);
      } catch {
        // network hiccup — back off and retry
        if (!cancelled) {
          timeoutId = setTimeout(() => poll(pageToken), 10000);
        }
        return;
      }
      if (cancelled) return;

      const { items, pollingInterval, nextPageToken: next } = result;
      if (items.length > 0) {
        setMessages((prev) => {
          const newMsgs = items.map((item) => ({
            id: item.id,
            name: item.authorDetails?.displayName,
            message: item.snippet?.displayMessage,
            profile: item.authorDetails?.profileImageUrl,
          }));
          return [...prev, ...newMsgs].slice(-200);
        });
      }
      // Jitter to avoid thundering-herd polling
      const jitter = Math.floor(Math.random() * 1000);
      timeoutId = setTimeout(() => poll(next), pollingInterval + jitter);
    };

    setMessages([]);
    poll(null);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [liveChatId]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col bg-[#212121] rounded-xl border border-[#303030] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#303030]">
        <span className="w-2 h-2 rounded-full bg-[#ff0000] animate-pulse" />
        <h2 className="text-[#f1f1f1] font-semibold text-sm">Live chat</h2>
      </div>

      {/* Messages */}
      <div
        ref={listRef}
        className="flex flex-col overflow-y-auto h-64 md:h-[480px] px-3 py-2 gap-1 scrollbar-hide"
      >
        {messages.length === 0 ? (
          <p className="text-[#aaaaaa] text-xs text-center mt-4">
            Waiting for messages…
          </p>
        ) : (
          messages.map((c) => (
            <ChatMessage
              key={c.id}
              name={c.name}
              message={c.message}
              profile={c.profile}
            />
          ))
        )}
      </div>

      {/* Input */}
      <form
        className="flex items-center gap-2 px-3 py-3 border-t border-[#303030]"
        onSubmit={(e) => {
          e.preventDefault();
          // Sending to live chat requires OAuth — show placeholder
          setLiveMessage("");
        }}
      >
        <input
          type="text"
          aria-label="Send a message"
          className="flex-1 bg-[#121212] border border-[#303030] rounded-full px-4 py-2 text-[#f1f1f1] placeholder-[#aaaaaa] text-sm focus:outline-none focus:border-[#3ea6ff] transition-colors"
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
          placeholder="Send a message..."
        />
        <button
          type="submit"
          className="flex-shrink-0 bg-[#3ea6ff] text-[#0f0f0f] text-sm font-semibold rounded-full px-4 py-2 hover:bg-[#65b8ff] transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default LiveChat;
