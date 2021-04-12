# frozen_string_literal: true

class User < ApplicationRecord
  mount_uploader :photo_url, PhotoUploader

  validates :first_name, :last_name, :email, presence: true
end
