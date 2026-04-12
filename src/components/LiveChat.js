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
    <div className="flex flex-col bg-white/5 backdrop-blur rounded-2xl border border-white/10 overflow-hidden shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#ff2e4d] opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff2e4d]" />
        </span>
        <h2 className="text-[#f4f4f5] font-bold text-sm tracking-tight">
          Live chat
        </h2>
      </div>

      <div
        ref={listRef}
        className="flex flex-col overflow-y-auto h-64 md:h-[480px] px-3 py-2 gap-1 scrollbar-hide"
      >
        {messages.length === 0 ? (
          <p className="text-[#71717a] text-xs text-center mt-4">
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
        className="flex items-center gap-2 px-3 py-3 border-t border-white/10"
        onSubmit={(e) => {
          e.preventDefault();
          setLiveMessage("");
        }}
      >
        <input
          type="text"
          aria-label="Send a message"
          className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-[#f4f4f5] placeholder-[#71717a] text-sm focus:outline-none focus:border-[#ff2e4d]/60 focus:bg-white/10 transition-colors"
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
          placeholder="Send a message..."
        />
        <button
          type="submit"
          className="press flex-shrink-0 bg-gradient-to-br from-[#ff2e4d] to-[#ff5d7a] text-white text-sm font-semibold rounded-full px-4 py-2 shadow-[0_6px_18px_-8px_rgba(255,46,77,0.6)] hover:shadow-[0_8px_22px_-8px_rgba(255,46,77,0.8)] transition-shadow"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default LiveChat;
