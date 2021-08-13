# frozen_string_literal: true

class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :activity_type, :activeble_type, :user_id, :activeble_id

  belongs_to :activeble, polymorphic: true, optional: true
  belongs_to :user
end
