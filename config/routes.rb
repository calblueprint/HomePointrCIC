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
  get 'tenants/:id/edit' => 'tenants#edit'
  get 'tenants/:id' => 'tenants#show'
  get '/tenants/categories' => 'tenants#get_tenant_category_enums'

  resources :referral_agencies, only: %i[create show update edit destroy]
  resources :landlords, only: %i[create show update edit destroy]
  resources :properties, only: %i[new create update index edit show destroy]
  resources :tenants, only: %i[new create edit update show index destroy]
  resources :applications, only: %i[index new create edit update show destroy]
  # resources :properties, :only => [:create, :update, :show, :destroy]
  resources :properties
  # resources :tenants, :only => [:create, :update, :show, :destroy]
  resources :tenants
  # resources :applications, only: %i[create show destroy]
  devise_for :users, controllers: {
    sessions: 'sessions',
    registrations: 'registrations'
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
