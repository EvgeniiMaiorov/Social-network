# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :jwt_authenticatable,
         jwt_revocation_strategy: JwtDenylist

  mount_uploader :photo_url, PhotoUploader

  has_many :user_interests, dependent: :destroy
  has_many :interests, through: :user_interests
  validates :first_name, :last_name, :email, presence: true
end
