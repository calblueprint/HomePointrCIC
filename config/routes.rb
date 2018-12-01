Rails.application.routes.draw do
  get 'home/index'
  get 'errors/show'
  resources :referral_agencies, :only => [:create, :show, :update, :edit, :destroy]
  resources :landlords, :only => [:create, :show, :update, :edit, :destroy]
  resources :properties, :only => [:new, :create, :update, :index, :edit, :show, :destroy]
  resources :tenants, :only => [:new, :create, :edit, :update, :show, :index, :destroy]
  resources :applications, :only => [:new, :create, :edit, :update, :index, :show, :destroy]
  # resources :properties, :only => [:create, :update, :show, :destroy]
  resources :properties
  # resources :tenants, :only => [:create, :update, :show, :destroy]
  resources :tenants
  resources :applications, :only => [:create, :show, :destroy]
  resources :infos, :only => [:create]
  devise_for :users, controllers: {
        sessions: 'sessions',
        registrations: "registrations"
      }
  devise_scope :user do
  authenticated do 
  	root 'home#index', as: :authenticated_root
  end

  unauthenticated do
    root 'sessions#new', as: :unauthenticated_root
  end
 end

  namespace :api do
  	resources :landlords, :referral_agencies, :tenants, :properties, :infos, :applications
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
