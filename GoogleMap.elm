module GoogleMap where

import Html exposing (Html)

import Native.GoogleMap


type Action
  = MoveToCoords (Float, Float)
  | ZoomToLevel Int


type alias Model =
  { lat : Float
  , lon : Float
  , zoom : Int
  -- TODO: markers, etc
  }


update : Action -> Model -> Model
update action model =
  case action of
    MoveToCoords (lat, lon) ->
      { model | lat = lat, lon = lon }

    ZoomToLevel zoom ->
      { model | zoom = zoom }


view : Signal.Address Action -> Model -> Html
view =
  Native.GoogleMap.view
