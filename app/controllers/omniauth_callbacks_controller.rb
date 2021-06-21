# frozen_string_literal: true

class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  skip_before_action :verify_authenticity_token

  def google_oauth2
    user = User.from_omniauth(request.env['omniauth.auth'], 'google')
    persisted = user.persisted?

    if persisted || user.save
      get_token(user, persisted)
    else
      render json: { error: user.errors.messages }, status: :unprocessable_entity
    end
  end

  private

  def get_token(user, persisted)
    token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
    response.set_header('Authorization', "Bearer #{token}")

    render json: { persisted: persisted, user: user }
  end
end
