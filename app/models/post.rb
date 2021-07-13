# frozen_string_literal: true

class Post < ApplicationRecord
  belongs_to :user

  scope :published, -> { where.not(published_at: nil) }

  mount_uploader :image, ImageUploader

  validates :title, :body, presence: true
end
