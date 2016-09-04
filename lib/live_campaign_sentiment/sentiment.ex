defmodule LiveCampaignSentiment.Sentiment do
  def analyze(tweet) do
    spawn(__MODULE__, :do_analyze, [tweet])
    :ok
  end

  def do_analyze(tweet) do
    Sentient.analyze(tweet.text)
    |> update_store(tweet)
  end

  defp update_store(value, tweet) do
    case get_name_from_tweet(tweet) do
      {:ok, name} ->
        LiveCampaignSentiment.Store.update(%{name: name, value: value})
      {:nomatch} ->
        nil
    end
  end

  defp get_name_from_tweet(tweet) do
    match_clinton = Regex.match?(~r/clinton/i, tweet.text)
    match_trump   = Regex.match?(~r/trump/i, tweet.text)

    cond do
      match_clinton && !match_trump  -> {:ok, :clinton}
      match_trump && !match_clinton  -> {:ok, :trump}
      match_trump && match_clinton   -> {:nomatch}
      !match_trump && !match_clinton -> {:nomatch}
    end
  end
end
