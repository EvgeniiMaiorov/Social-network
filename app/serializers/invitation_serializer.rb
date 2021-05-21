# frozen_string_literal: true

class InvitationSerializer < ActiveModel::Serializer
  attributes :id, :status

  belongs_to :user
  belongs_to :friend, serializer: :user
end
