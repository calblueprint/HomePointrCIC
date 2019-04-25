# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :admin do
      resources :users
      resources :emails
      resources :applications
      resources :properties
      resources :tenants
      resources :landlords
      resources :referral_agencies

      root to: "users#index"
    end
  get 'home/index'
  get 'errors/show'
  
  get 'applications/new/:id' => 'applications#new'

  get '/properties/new' => 'properties#new'
  get 'properties/:id/edit' => 'properties#edit'
  get 'properties/:id' => 'properties#show'
  get '/properties/categories' => 'properties#get_property_category_enums'

  get '/tenants/new' => 'tenants#new'
  get 'tenants/:id/edit' => 'tenants#edit'
  get 'tenants/:id' => 'tenants#show'
  get '/tenants/categories' => 'tenants#get_tenant_category_enums'

  get 'referral_agencies/:id/edit' => 'referral_agencies#edit'

  resources :referral_agencies, only: %i[create show update edit destroy]
  resources :landlords, only: %i[create show update edit destroy]
  resources :properties, only: %i[new create update index edit show destroy]
  resources :tenants, only: %i[new create edit update show destroy]
  resources :applications, only: %i[index new create edit update show destroy]
  # resources :properties, :only => [:create, :update, :show, :destroy]
  resources :properties
  # resources :tenants, :only => [:create, :update, :show, :destroy]
  resources :tenants
  # resources :applications, only: %i[create show destroy]
  devise_for :users, controllers: {
    sessions: 'sessions',
    registrations: 'registrations',
    passwords: 'passwords'
  }
  devise_scope :user do
    authenticated do
      root 'home#index', as: :authenticated_root
    end

    unauthenticated do
      root 'sessions#new', as: :unauthenticated_root
    end

    namespace :api do
      resources :landlords, :referral_agencies, :applications, :tenants
      resources :properties do
        collection do
          delete 'delete_image_attachment/:image_id', to: 'properties#delete_image_attachment'
        end
      end
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
