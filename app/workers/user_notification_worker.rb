# frozen_string_literal: true

class UserNotificationWorker
  include Sidekiq::Worker

  def perform
    User.where('online_since < ?', 7.days.ago).find_each do |user|
      NotificationMailer.notification(user).deliver_later
    end
  end
end
