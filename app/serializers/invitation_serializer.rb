# frozen_string_literal: true

class InvitationSerializer
  include FastJsonapi::ObjectSerializer

  attributes :status

  belongs_to :user
  belongs_to :friend, serializer: :user
end
