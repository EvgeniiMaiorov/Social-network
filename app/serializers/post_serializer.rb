# frozen_string_literal: true

class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :image, :published_at, :user_id

  has_many :comments
  has_many :tags
  has_many :activities, as: :activeble

  belongs_to :user

  attribute :like_count do
    if instance_options[:like_count]
      instance_options[:like_count][[object.id, 'like']] || 0
    else
      object.likes.liked.count
    end
  end

  attribute :dislike_count do
    if instance_options[:like_count]
      instance_options[:like_count][[object.id, 'dislike']] || 0
    else
      object.likes.disliked.count
    end
  end

  attribute :like, if: -> { instance_options[:current_user] } do
    if instance_options[:user_post_likes]
      instance_options[:user_post_likes].find { |like| like.post_id == object.id }
    else
      object.likes.find_by(user_id: instance_options[:current_user].id)
    end
  end
end
