# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'user type model' do
    let(:user) { create(:user) }
    let(:friend) { create(:user) }
    let(:subscriber) { create(:user) }
    let(:another_friend) { create(:user) }
    let(:inviter) { create(:user) }
    let!(:invitation1) { create(:invitation, :accepted, user: user, friend: friend) }
    let!(:invitation2) { create(:invitation, :accepted, user: another_friend, friend: user) }
    let!(:invitation3) { create(:invitation, :rejected, user: subscriber, friend: user) }
    let!(:invitation4) { create(:invitation, :pending, user: inviter, friend: user) }

    context '#friends' do
      it 'show friends' do
        friends =
        user.friends.map do |invitation|
          if invitation.friend_id == user.id
            invitation.user_id
          else
            invitation.friend_id
          end
        end

        expect(user.friends.length).to eq(2)
        expect(friends.sort).to eq([friend.id, another_friend.id])
      end
    end

    context '#subscribers' do
      it 'show subscribers' do
        expect(user.subscribers.length).to eq(1)
        expect(user.subscribers[0][:user_id]).to eq(subscriber.id)
      end
    end

    context '#inviters' do
      it 'show inviters' do
        expect(user.inviters.length).to eq(1)
        expect(user.inviters[0][:user_id]).to eq(inviter.id)
      end
    end
  end
end
