import React, {FunctionComponent} from 'react'
import ImageViewer from 'react-native-image-zoom-viewer'
import {connect} from 'react-redux'
import {AppState, dispatchHandler} from '../State-management'

type Props = {initialIndex: number; images: Array<any>}

const ImageView: FunctionComponent<Props> = (props: Props) => {
  const restructuredImages = props.images.map((image) => ({url: image}))
  return (
    <ImageViewer
      imageUrls={restructuredImages}
      enablePreload
      index={props.initialIndex}
    />
  )
}

const mapStateToProps = (state: AppState) => ({
  initialIndex: state.refuel.imageViewInitialIndex,
})

const mapDispatchToProps = (dispatch: any) => ({
  dispatch: dispatchHandler(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageView)
