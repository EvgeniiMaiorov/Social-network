# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :jwt_authenticatable,
         :omniauthable,
         omniauth_providers: [:google_oauth2],
         jwt_revocation_strategy: JwtDenylist

  self.skip_session_storage = %i[http_auth params_auth]

  mount_uploader :photo, PhotoUploader

  has_many :user_interests, dependent: :destroy
  has_many :interests, through: :user_interests
  has_many :own_invitations, class_name: 'Invitation', dependent: :destroy
  has_many :received_invitations, class_name: 'Invitation', foreign_key: 'friend_id', dependent: :destroy
  has_many :pending_invitations, -> { pending }, class_name: 'Invitation'
  has_many :accepted_invitations, -> { accepted }, class_name: 'Invitation'
  has_many :rejected_invitations, -> { rejected }, class_name: 'Invitation'

  validates :first_name, :last_name, :email, presence: true
  validates :email, uniqueness: { scope: :provider_identifier }

  def self.from_omniauth(access_token, provider_identifier)
    data = access_token.info
    User.find_or_create_by(email: data['email'], provider_identifier: provider_identifier) do |user|
      user.first_name = data['first_name']
      user.last_name = data['last_name']
      user.remote_photo_url = data['image']
    end
  end
end
