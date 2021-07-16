# frozen_string_literal: true

class Post < ApplicationRecord
  belongs_to :user
  has_many :comments, dependent: :destroy

  scope :published, -> { where.not(published_at: nil) }

  mount_uploader :image, ImageUploader

  validates :title, :body, presence: true
end
