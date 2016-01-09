module Main where

import Html exposing (..)
import Html.Events exposing (..)
import StartApp.Simple as StartApp

import GoogleMap


type Action
  = ZoomIn
  | ZoomOut
  | MapAction GoogleMap.Action
  | ToggleDifferent


type alias Model =
  { different : Bool
  , map : GoogleMap.Model
  }


view : Signal.Address Action -> Model -> Html
view address model =
  div
    []
    [ pre [] [text <| toString model]
    , button [onClick address ZoomIn] [text "+"]
    , button [onClick address ZoomOut] [text "-"]
    , button [onClick address ToggleDifferent] [text "Switch"]
    , if model.different then
        p [] [text "And now for something completely different"]
      else
        GoogleMap.view (Signal.forwardTo address MapAction) model.map
    ]


update : Action -> Model -> Model
update action model =
  case action of
    ZoomIn ->
      { model | map =
          GoogleMap.update (GoogleMap.ZoomToLevel (model.map.zoom + 1)) model.map
      }

    ZoomOut ->
      { model | map =
          GoogleMap.update (GoogleMap.ZoomToLevel (model.map.zoom - 1)) model.map
      }

    MapAction mapAction ->
      { model | map = GoogleMap.update mapAction model.map }

    ToggleDifferent ->
      { model | different = not model.different }


main =
  StartApp.start
    { model =
        { map = { lat = 0, lon = 0, zoom = 3 }
        , different = False
        }
    , view = view
    , update = update
    }
