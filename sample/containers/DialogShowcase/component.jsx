import React, { Component } from 'react';
import { Dialog, ConfirmDialog, ErrorDialog, Button } from 'omni-common-ui';
import Showcase from 'components/Showcase';

class DialogShowcase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      isConfirmDialogOpen: false,
      isErrorDialogOpen: false,
      isDialogLoading: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isDialogLoading === this.state.isDialogLoading ||
        ! this.state.isDialogLoading) {
      return;
    }
    setTimeout(() => {
      this.setState({ isDialogLoading: false });
    }, 2000);
  }

  render() {
    return <Showcase title="Dialogs" titleLink="dialogs">
      {/* Dialog Trigger */}
      <Button type={Button.Type.neo}
          onClick={() =>
            this.setState({ isDialogOpen: true })}>
        Show dialog
      </Button>

      {/* ConfirmDialog Trigger */}
      <Button type={Button.Type.neo}
          onClick={() =>
            this.setState({ isConfirmDialogOpen: true })}>
        Show confirmation prompt
      </Button>

      {/* ErrorDialog Trigger */}
      <Button type={Button.Type.neo}
          onClick={() =>
            this.setState({ isErrorDialogOpen: true })}>
        Show error modal
      </Button>

      {/* --- */}

      {/* Dialog Component */}
      <Dialog isOpen={this.state.isDialogOpen}
          isLoading={this.state.isDialogLoading}
          onRequestClose={() => this.setState({
            isDialogOpen: false,
          })}>
        <p>Dialog Content</p>
        <Button type={Button.Type.neo}
            onClick={() =>
              this.setState({ isDialogLoading: true })}>
          Do something
        </Button>
      </Dialog>

      {/* ConfirmDialog Component */}
      <ConfirmDialog isOpen={this.state.isConfirmDialogOpen}
          title="Dialog Title"
          primaryButtonContent="Close"
          secondaryButtonContent="Something else"
          onPrimaryClick={() => this.setState({
            isConfirmDialogOpen: false,
          })}>
        <p>
          Dialog Content
        </p>
      </ConfirmDialog>

      {/* ErrorDialog Component */}
      <ErrorDialog isOpen={this.state.isErrorDialogOpen}
          onConfirmClick={() => this.setState({
            isErrorDialogOpen: false,
          })} />
    </Showcase>;
  }
}

export default DialogShowcase;
