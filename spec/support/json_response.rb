# frozen_string_literal: true

module JsonResponse
  def json(symbolize_names: true)
    JSON.parse(response.body, symbolize_names: symbolize_names)
  end
end

RSpec.configure do |config|
  config.include JsonResponse, type: :controller
end
