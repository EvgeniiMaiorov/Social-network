# frozen_string_literal: true

class UpdatePostService
  attr_reader :post, :params

  def initialize(post, params)
    @post = post
    @params = params
  end

  def call
    post.published_at = Time.now.utc unless post.persisted? || params[:delay]
    post.tags = tags_from_params

    if post.save
      PublishPostWorker.perform_in(params[:delay].to_i.hours, post.id) if params[:delay]
      OpenStruct.new(success?: true, post: post)
    else
      OpenStruct.new(success?: false, errors: post.errors.messages)
    end
  end

  private

  def tags_from_params
    params[:tags].map do |tag|
      Tag.find_or_create_by!(name: tag)
    end
  end
end
