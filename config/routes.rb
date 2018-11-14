Rails.application.routes.draw do
  get 'errors/show'
  resources :referral_agencies, :only => [:create, :show, :update, :edit, :destroy]
  resources :landlords, :only => [:create, :show, :update, :edit, :destroy]
  resources :properties, :only => [:new, :create, :update, :edit, :show, :destroy]
  resources :tenants, :only => [:new, :create, :edit, :update, :show, :index, :destroy]
  resources :applications, :only => [:new, :create, :edit, :update, :show, :destroy]
  # resources :properties, :only => [:create, :update, :show, :destroy]
  resources :properties
  # resources :tenants, :only => [:create, :update, :show, :destroy]
  resources :tenants
  resources :applications, :only => [:create, :show, :destroy]
  resources :infos, :only => [:create]
  devise_for :users

  namespace :api do
  	resources :landlords, :referral_agencies, :infos, :applications
    resources :properties, :tenants do
      member do
        delete 'delete_image_attachment/:image_id', :action => 'delete_image_attachment'
      end
    end
  end

  devise_scope :user do
  unauthenticated do
    root 'devise/sessions#new', as: :unauthenticated_root
  end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
