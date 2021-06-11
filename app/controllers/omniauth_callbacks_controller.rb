# frozen_string_literal: true

class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  skip_before_action :verify_authenticity_token

  def google_oauth2
    user = User.from_omniauth(request.env['omniauth.auth'], 'google')
    token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
    response.set_header('Authorization', "Bearer #{token}")

    render json: user
  end
end
