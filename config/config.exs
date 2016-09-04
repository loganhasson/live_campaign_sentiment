# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

config :extwitter, :oauth, [
  consumer_key: "O59tA4rzOEizOx440AZvXM9me",
  consumer_secret: "00MxxA76nrco1MUFN0taWqbAjiMSz6LLjBZkJRn4FZBH7XK2el",
  access_token: "15052759-FlOanNi7nRram66HmLOnGvQNAUiKm4mnbdJsHD2nA",
  access_token_secret: "c88Eto7cuMCWWMx7o7XDOIhXYF4Ue80bPXMUvvjI5VnHH"
]

# Configures the endpoint
config :live_campaign_sentiment, LiveCampaignSentiment.Endpoint,
  url: [host: "localhost"],
  root: Path.dirname(__DIR__),
  secret_key_base: "qXb11SvLSUkS246eGVac+EbxWcKKc6w1lsfVhUK0D+CiJRe4zyg8YqCjwYJiGhtI",
  render_errors: [accepts: ~w(html json)],
  pubsub: [name: LiveCampaignSentiment.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

# Configure phoenix generators
config :phoenix, :generators,
  migration: true,
  binary_id: false
