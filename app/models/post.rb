# frozen_string_literal: true

class Post < ApplicationRecord
  belongs_to :user

  mount_uploader :image, ImageUploader

  validates :title, :body, presence: true
end
