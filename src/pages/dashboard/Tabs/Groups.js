import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip, Form, FormGroup, Label, Input, Collapse, CardHeader, CardBody, Alert, InputGroup, InputGroupAddon, Media, Card, Badge } from 'reactstrap';
import { Link } from "react-router-dom";

import {repo} from "../../../mobx/store"
import {useProxy} from "valtio"
import { withTranslation } from 'react-i18next';

import SimpleBar from "simplebar-react";

//components
import SelectContact from "../../../components/SelectContact";


const Groups = (props) => {
    const snapshot = useProxy(repo)
    const [modal, setModal] = useState(false)
    const [isOpenCollapse, setisOpenCollapse] = useState(false)
    const [groups, setgroups] = useState(snapshot.groups)
    const [selectedContact, setselectedContact] = useState([])
    const [isOpenAlert, setisOpenAlert] = useState(false)
    const [message, setmessage] = useState("")
    const [groupName, setgroupName] = useState("")
    const [groupDesc, setgroupDesc] = useState("")
   

    const toggle = () => {
        setModal(!modal)
    }

    const toggleCollapse = () => {
        setisOpenCollapse(!isOpenCollapse)
    }

    

    const createGroup = () => {
        if(selectedContact.length > 2) {
            // gourpId : 5, name : "#Project-aplha", profilePicture : "Null", isGroup : true, unRead : 0, isNew : true, desc : "project related Group",
            var obj = {
                gourpId : groups.length+1,
                name : "#" + groupName,
                profilePicture : "Null",
                isGroup : true,
                unRead : 0,
                isNew : true,
                desc : groupDesc,
                members : selectedContact
            }
            //call action for creating a group
           // this.props.createGroup(obj);
           toggle();

        } else if(selectedContact.length === 1) {
            setmessage("Minimum 2 members required!!!")
            setisOpenAlert(true)
            
        } else {
            setmessage("Minimum 2 members required!!!")
            setisOpenAlert(true)
            
        }
        setTimeout(
            function() {
                setisOpenAlert(false)
            }
            .bind(this),
            3000
        );
    }

    const handleCheck = (e, contactId) => {
        var selected = selectedContact;
        var obj;
        if(e.target.checked) {
            obj = {
                id : contactId,
                name : e.target.value 
            };
            selected.push(obj);
           
            setselectedContact(selected)
        }
    }

    const handleChangeGroupName = (e) => {
        setgroupName(e.target.value);
    }

    const handleChangeGroupDesc = (e) => {
       setgroupDesc(e.target.value);
    }
    const { t } = props;
     
        return (
            <React.Fragment>
            <div>
                            <div className="p-4">
                                <div className="user-chat-nav float-right">
                                    <div  id="create-group">
                                        {/* Button trigger modal */}
                                        <Button onClick={toggle} type="button" color="link" className="text-decoration-none text-muted font-size-18 py-0">
                                            <i className="ri-group-line mr-1"></i>
                                        </Button>
                                    </div>
                                    <UncontrolledTooltip target="create-group" placement="bottom">
                                        Create group
                                    </UncontrolledTooltip>

                                </div>
                                <h4 className="mb-4">{t('Groups')}</h4>

                                {/* Start add group Modal */}
                                <Modal isOpen={modal} centered toggle={toggle}>
                                            <ModalHeader tag="h5" className="modal-title font-size-16" toggle={toggle}>{t('Create New Group')}</ModalHeader>
                                            <ModalBody className="p-4">
                                                <Form>
                                                    <FormGroup className="mb-4">
                                                        <Label htmlFor="addgroupname-input">{t('Group Name')}</Label>
                                                        <Input type="text" className="form-control" id="addgroupname-input" value={groupName} onChange={(e) => handleChangeGroupName(e)} placeholder="Enter Group Name" />
                                                    </FormGroup>
                                                    <FormGroup className="mb-4">
                                                        <Label>{t('Group Members')}</Label>
                                                        <Alert isOpen={isOpenAlert} color="danger">
                                                            {message}
                                                        </Alert>
                                                        <div className="mb-3">
                                                            <Button color="light" size="sm" type="button" onClick={toggleCollapse}>
                                                                {t('Select Members')}
                                                            </Button>
                                                        </div>

                                                        <Collapse isOpen={isOpenCollapse} id="groupmembercollapse">
                                                            <Card className="border">
                                                                <CardHeader>
                                                                    <h5 className="font-size-15 mb-0">{t('Contacts')}</h5>
                                                                </CardHeader>
                                                                <CardBody className="p-2">
                                                                    <SimpleBar style={{maxHeight: "150px"}}>
                                                                        {/* contacts */}
                                                                        <div id="addContacts">
                                                                            <SelectContact handleCheck={handleCheck} />
                                                                        </div>
                                                                    </SimpleBar>
                                                                </CardBody>
                                                            </Card>
                                                        </Collapse>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label htmlFor="addgroupdescription-input">Description</Label>
                                                        <textarea className="form-control" id="addgroupdescription-input" value={groupDesc} onChange={(e) => handleChangeGroupDesc(e)} rows="3" placeholder="Enter Description"></textarea>
                                                    </FormGroup>
                                                </Form>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button type="button" color="link" onClick={toggle}>{t('Close')}</Button>
                                                <Button type="button" color="primary" onClick={createGroup}>Create Group</Button>
                                            </ModalFooter>
                                </Modal>
                                {/* End add group Modal */}

                                <div className="search-box chat-search-box">
                                    <InputGroup size="lg" className="bg-light rounded-lg">
                                        <InputGroupAddon addonType="prepend">
                                            <Button color="link" className="text-decoration-none text-muted pr-1" type="button">
                                                <i className="ri-search-line search-icon font-size-18"></i>
                                            </Button>
                                        </InputGroupAddon>
                                        <Input type="text" className="form-control bg-light" placeholder="Search groups..." />
                                    </InputGroup>
                                </div>
                                {/* end search-box */}
                            </div>

                            {/* Start chat-group-list */}
                            <SimpleBar style={{ maxHeight: "100%" }} className="p-4 chat-message-list chat-group-list">


                                <ul className="list-unstyled chat-list">
                                    {
                                       groups.map((group, key) =>
                                            <li key={key} >
                                                <Link to="#">
                                                    <Media className="align-items-center">
                                                        <div className="chat-user-img mr-3">
                                                            <div className="avatar-xs">
                                                                <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                                    {group.name.charAt(1)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <Media body className="overflow-hidden">
                                                            <h5 className="text-truncate font-size-14 mb-0">
                                                                {group.name}
                                                                {
                                                                    group.unRead !== 0
                                                                    ?   <Badge color="none" pill className="badge-soft-danger float-right">
                                                                        {
                                                                            group.unRead >= 20 ? group.unRead + "+" : group.unRead
                                                                        }
                                                                        </Badge>
                                                                    :   null
                                                                }

                                                                {
                                                                    group.isNew && <Badge color="none" pill className="badge-soft-danger float-right">New</Badge>
                                                                }
                                                                
                                                            </h5>
                                                        </Media>
                                                    </Media>
                                                </Link>
                                            </li>
                                        )
                                    }
                                </ul>
                            </SimpleBar>
                            {/* End chat-group-list */}
                        </div>
        </React.Fragment>
        );
    
}

// const mapStateToProps = (state) => {
//     const { groups, active_user } = state.Chat;
//     return { groups,active_user };
// };

export default withTranslation()(Groups);