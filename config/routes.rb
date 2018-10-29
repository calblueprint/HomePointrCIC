Rails.application.routes.draw do
	root :to => "tenants#index"
  resources :referral_agencies, :only => [:create, :show, :update, :destroy]
  resources :landlords, :only => [:create, :show, :update, :destroy]
  resources :properties, :only => [:create, :update, :show, :destroy]
  resources :tenants, :only => [:new, :create, :update, :show, :index, :destroy]
  resources :applications, :only => [:new, :create, :show, :destroy]
  resources :infos, :only => [:create]
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
