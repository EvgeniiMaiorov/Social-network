# frozen_string_literal: true

class PublishPostWorker
  include Sidekiq::Worker

  def perform(id)
    Post.find_by(id: id)&.update(published_at: Time.now.utc)
  end
end
