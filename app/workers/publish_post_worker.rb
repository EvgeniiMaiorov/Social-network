# frozen_string_literal: true

class PublishPostWorker
  include Sidekiq::Worker

  def perform(id)
    puts id
  end
end
