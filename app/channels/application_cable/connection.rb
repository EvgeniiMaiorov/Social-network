# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    protected

    def find_verified_user
      params = request.query_parameters

      unless params['authorization'] && params['authorization'].split.size > 1
        reject_unauthorized_connection
      end

      token = params['authorization'].split[1]
      jwt = JWT.decode(token, ENV['DEVISE_JWT_SECRET_KEY'], true, algorithm: 'HS256', verify_jti: true)[0]

      if (user = User.find(jwt['sub']))
        user
      else
        reject_unauthorized_connection
      end
    end
  end
end
