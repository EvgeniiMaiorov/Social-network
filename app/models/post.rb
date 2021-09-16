# frozen_string_literal: true

class Post < ApplicationRecord
  include Activities

  belongs_to :user

  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :activities, as: :activeble, dependent: :destroy

  has_and_belongs_to_many :tags

  scope :published, -> { where.not(published_at: nil) }
  scope :visible, -> { where(visibility: true) }

  mount_uploader :image, ImageUploader

  searchkick match: :text_middle

  def search_data
    {
      user_id: user_id,
      title: title,
      body: body,
      tags: tags.map(&:name).join(' '),
      published: published_at.present?,
      visible: visibility
    }
  end

  validates :title, :body, presence: true
end
