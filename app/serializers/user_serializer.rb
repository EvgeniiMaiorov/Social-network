# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :photo, :location

  has_many :interests
  has_many :comments
  has_many :conversations

  attribute :online do
    object.online?
  end

  show_invitation = -> { instance_options[:current_user] && instance_options[:current_user].id != object.id }
  attribute :invitation, if: show_invitation do
    object.received_invitations.where(user_id: instance_options[:current_user].id)
          .or(object.own_invitations.where(friend_id: instance_options[:current_user].id))
          .first
  end
end
