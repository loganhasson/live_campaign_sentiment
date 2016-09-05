defmodule LiveCampaignSentiment.Stats do
  def empty do
    stored_stats = RedisHash.new("sentiment_stats")

    case RedisHash.pull(stored_stats) do
      %{} ->
        %{trump: %{count: 0, average: 0, total: 0, positive: 0, negative: 0, history: %{current_period: %{}, previous_summaries: []}}, clinton: %{count: 0, average: 0, total: 0, positive: 0, negative: 0, history: %{current_period: %{}, previous_summaries: []}}}

      stored_results -> stored_results
    end
  end
end
