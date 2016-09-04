defmodule LiveCampaignSentiment.Stats do
  def empty do
    %{trump: %{count: 0, average: 0, total: 0, positive: 0, negative: 0}, clinton: %{count: 0, average: 0, total: 0, positive: 0, negative: 0}}
  end
end
