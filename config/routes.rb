Rails.application.routes.draw do
  get 'home/index'
  get 'errors/show'
  resources :referral_agencies, :only => [:create, :show, :update, :edit, :destroy]
  resources :landlords, :only => [:create, :show, :update, :edit, :destroy]
  resources :properties, :only => [:new, :create, :update, :edit, :show, :destroy]
  resources :tenants, :only => [:new, :create, :edit, :update, :show, :index, :destroy]
  resources :applications, :only => [:new, :create, :edit, :update, :show, :destroy]
  resources :infos, :only => [:create]
  devise_for :users, controllers: {
        sessions: 'sessions'
      }
  devise_scope :user do
  authenticated do 
  	root 'home#index', as: :authenticated_root
  end
  
  unauthenticated do
    root 'devise/sessions#new', as: :unauthenticated_root
  end
 end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
