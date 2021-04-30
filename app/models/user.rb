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
  has_many :invitations, dependent: :destroy
  has_many :pending_invitations, lambda {
                                   where confirmed: false
                                 }, class_name: 'Invitation', foreign_key: 'friend_id', inverse_of: :user
  validates :first_name, :last_name, :email, presence: true

  def friends
    friends_i_sent_invitation = Invitation.where(user_id: id, confirmed: true).pluck(:friend_id)
    friends_i_got_invitation = Invitation.where(friend_id: id, confirmed: true).pluck(:user_id)
    ids = friends_i_sent_invitation + friends_i_got_invitation
    User.where(id: ids)
  end

  def friend_with?(user)
    Invitation.confirmed_record?(id, user.id)
  end

  def send_invitation(user)
    invitations.create(friend_id: user.id)
  end
end
