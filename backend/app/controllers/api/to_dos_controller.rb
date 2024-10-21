class Api::ToDosController < ApplicationController

    def save_tasks

        p "sjasnlsnadlsdnlsandl",params

        render json: { message: "todos notes updated"}, status: :ok

    end
end
