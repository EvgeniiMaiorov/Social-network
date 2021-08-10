# frozen_string_literal: true

module Activities
  extend ActiveSupport::Concern

  included do
    after_commit :create_common_activity, on: :create
    after_commit :create_invitation_activity, on: :update, if: -> { is_a?(Invitation) }
    after_commit :create_user_activity, on: :update, if: -> { is_a?(User) }
  end

  def create_common_activity
    activities.create(activity_type: :"create_#{self.class.name.downcase}", user_id: user_id)
  end

  def create_invitation_activity
    case previous_changes['status'][1]
    when 'accepted'
      activities.create(activity_type: :make_friend, user_id: user_id)
      activities.create(activity_type: :make_friend, user_id: friend_id)
    when 'rejected'
      activities.create(activity_type: :reject_friend, user_id: user_id)
      activities.create(activity_type: :reject_friend, user_id: friend_id)
    end
  end

  def create_user_activity
    return unless previous_changes['online_since'] && !online?(previous_changes['online_since'][0])

    activities.create(activity_type: :user_online, user_id: id)
  end
end
