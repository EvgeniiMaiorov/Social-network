# frozen_string_literal: true

class NotificationMailer < ApplicationMailer
  def notification(user)
    @user = user
    mail(to: @user.email, subject: 'Test Email for Letter Opener')
  end
end
