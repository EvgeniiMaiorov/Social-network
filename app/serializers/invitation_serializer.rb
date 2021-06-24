# frozen_string_literal: true

class InvitationSerializer < ActiveModel::Serializer
  attributes :id, :status, :friend_id

  belongs_to :user
  belongs_to :friend, serializer: UserSerializer
end
