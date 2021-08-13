# frozen_string_literal: true

class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :image, :published_at

  has_many :comments
  has_many :tags
  has_many :activities, as: :activeble

  belongs_to :user

  attribute :like_count do
    object.likes.liked.count
  end

  attribute :dislike_count do
    object.likes.disliked.count
  end

  attribute :like, if: -> { instance_options[:current_user] } do
    object.likes.find_by(user_id: instance_options[:current_user].id)
  end
end
