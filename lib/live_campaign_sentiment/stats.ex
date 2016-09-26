defmodule LiveCampaignSentiment.Stats do
  def empty do
    #stored_stats = RedisHash.new("sentiment_stats")

    #case RedisHash.pull(stored_stats) do
      #%{} ->
        #%{trump: %{location: %{}, rolling: %{tweets: []}, count: 0, average: 0, total: 0, positive: 0, negative: 0}, clinton: %{location: %{}, rolling: %{tweets: []}, count: 0, average: 0, total: 0, positive: 0, negative: 0}}

      #stored_results -> stored_results
    #end
    %{trump: %{location: %{}, rolling: %{tweets: []}, count: 0, average: 0, total: 0, positive: 0, negative: 0}, clinton: %{location: %{}, rolling: %{tweets: []}, count: 0, average: 0, total: 0, positive: 0, negative: 0}}
  end
end
