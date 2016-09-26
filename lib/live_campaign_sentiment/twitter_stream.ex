defmodule LiveCampaignSentiment.TwitterStream do
  def subscribe(terms \\ "trump,hillary") do
    stream = ExTwitter.stream_filter(track: terms, language: "en")
              |> Stream.map(fn(tweet) -> LiveCampaignSentiment.Sentiment.analyze(tweet) end)

    Enum.to_list(stream)
  end
end
