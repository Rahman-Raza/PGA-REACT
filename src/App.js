import React, { Component } from 'react';
import './App.css';
import { makeData} from "./Utils";
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';


// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  TextValidator,
  ValidatorForm,

} from "react-material-ui-form-validator";







class App extends Component {
 constructor() {
    super();
    this.state = {
      formData: {
        firstName: '',
        lastName: '',
        score: '',
      },
      data: makeData(10),
      open: false,
    };
    this.renderEditable = this.renderEditable.bind(this);
    this.renderDelete = this.renderDelete.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleFormErrors = this.handleFormErrors.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleSubmit = () =>{
    const {formData} = this.state;

    const {data} = this.state;


    data[data.length] = formData;

    this.setState({data: data, open: false});


  }

  handleClose = () => {
    this.setState({ open: false });
  };
    handleFormErrors(errors){
    console.log("there were errors here", errors);
  }
    handleChange(event){
    const { formData } = this.state;


    formData[event.target.name] = event.target.value;

    this.setState({formData});
  }
   renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

   renderDelete(cellInfo) {
    return (
       <IconButton  aria-label="Delete" color="primary"  >
        <Icon onClick={e => {
         
          const data = [...this.state.data];
         
          data.splice(cellInfo.index, 1); 

          this.setState({ data });
        }}>delete</Icon>
      </IconButton>
     
    );
  }
  render() {
   const { data } = this.state;
   const {formData} = this.state;
    return (
      <div>

      <div className="row" >
      <div className="col-md-2"></div>
      <div className="col-md-8">

     
      <h3 style={{marginTop: "50px",marginBottom: "25px", textAlign: "center"}}> First, Last Name and Score can be modified right in the table! </h3>
             <h3 style={{marginTop: "25px",marginBottom: "50px", textAlign: "center"}}> Click on any column name to sort. </h3>

        <ReactTable
          data={data}
          columns={[
            {
              Header: "Remove",
              accessor: "firstName",
              Cell: this.renderDelete
            },
            {
              Header: "First Name",
              accessor: "firstName",
              Cell: this.renderEditable
            },
            {
              Header: "Last Name",
              accessor: "lastName",
              Cell: this.renderEditable
            },
            {
              Header: "Full Name",
              id: "full",
              accessor: d =>
                <div
                  dangerouslySetInnerHTML={{
                    __html: d.firstName + " " + d.lastName
                  }}
                />
            },
            {
              Header: "Score",
              accessor: "score",
              Cell: this.renderEditable
            },
          ]}
          defaultPageSize={5}
          className="-striped -highlight"
        />
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen} style={{marginTop: "50px",marginBottom: "50px",marginLeft:"45%", textAlign: "center"}}>
          Add Data
        </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Row</DialogTitle>
          <DialogContent>
            <DialogContentText>
             Please complete the following:
            </DialogContentText>

              <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => this.handleFormErrors(errors)}
              >
              <TextValidator
                           label="First Name"
                          rows={4}
                          rowsMax={15}
                          name="firstName"
                          value={formData.firstName}
                          onChange={this.handleChange}
                          fullWidth={true}
                          className="text-field"
                          
                          
                         
                          style={{
                            fontSize: "14px",
                            color:"black",
                          }}
                          validators={["required", "minStringLength:3"]}
                          errorMessages={[
                            "this field is required",
                            "Please enter at least 3 characters"
                          ]}

                      />
                      <TextValidator
                           label="Last Name"
                          rows={4}
                          rowsMax={15}
                          name="lastName"
                          value={formData.lastName}
                          onChange={this.handleChange}
                          fullWidth={true}
                          className="text-field"
                          
                          
                         
                          style={{
                            fontSize: "14px",
                            color:"black",
                          }}
                          validators={["required", "minStringLength:3"]}
                          errorMessages={[
                            "this field is required",
                            "Please enter at least 3 characters"
                          ]}

                      />
                      <TextValidator
                           label="Score"
                          rows={4}
                          rowsMax={15}
                          name="score"
                          value={formData.score}
                          onChange={this.handleChange}
                          fullWidth={true}
                          className="text-field"
                          
                          
                         
                          style={{
                            fontSize: "14px",
                            color:"black",
                          }}
                          validators={["required", 'minNumber:1', 'maxNumber:100',]}
                          errorMessages={[
                            "this field is required",
                            "Please enter a number greater than 0",
                            "Please enter a number less than 100"
                            
                          ]}

                      />

                       <Button
                    
                    style={{marginTop: "25px",marginLeft:"40%", textAlign: "center"}}
                    variant="contained" 
                    color="primary"
                    
                  
                    type="submit"
                   
                 
                   
                  > Submit </Button>
              </ValidatorForm>
          </DialogContent>
          
        </Dialog>

        </div>

         <div className="col-md-2"></div>
    </div>
      </div>
    );
  }
}

export default App;
