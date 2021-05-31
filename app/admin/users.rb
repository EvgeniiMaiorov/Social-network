# frozen_string_literal: true

ActiveAdmin.register User do
  index do
    id_column
    column :email

    actions defaults: true do |user|
      item 'Log in As', login_as_user_path(user), method: :post, target: :_blank, class: 'member_link'
    end
  end

  filter :email

  form do |f|
    f.inputs do
      f.input :email
      f.input :password
      f.input :password_confirmation
    end
    f.actions
  end

end
