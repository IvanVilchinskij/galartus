import React, {useState, useEffect} from 'react';
import { 
    Container, 
    Button, 
    Form, 
    FormGroup, 
    Label, 
    Input, 
    TabContent, 
    TabPane, 
    Nav, 
    NavItem, 
    NavLink, 
    Card, 
    CardTitle, 
    CardText, 
    Row, 
    Col 
} from 'reactstrap';
import classnames from 'classnames';
import {connect} from 'react-redux';

import './adminControl.scss';

import * as actions from '../../actions/actions';
import WithMuseamService from '../hoc/withMuseamService';

const AdminControl = ({MuseamService, collections, collectionsLoaded}) => {
    const [activeTab, setActiveTab] = useState('1');

    useEffect(() => {
        MuseamService.getList('/categories')
            .then(res => {
                collectionsLoaded(res);
            })
            .catch((err) => {
                throw new Error(err);
            });
    }, []);

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    };

    const collectionsOptions = collections.map((item) => {
        return (
            <option label={item.name} key={item.id}>{item.id}</option>
        );
    })

    return (
        <div className="admin">
            <Container>
                <h3 className="admin__title">Управление контентом</h3>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggle('1'); }}
                        >
                            Collection
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Exhibition
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '3' })}
                            onClick={() => { toggle('3'); }}
                        >
                            Pictures
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <Form id='collcetionForm'>
                                    <FormGroup>
                                        <Label for="addName">Name</Label>
                                        <Input type="text" name="name" id="addName"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exampleImage">File</Label>
                                        <Input type="file" name="image" id="exampleImage" />
                                    </FormGroup>
                                    <Button onClick={() => MuseamService.setItem('#collcetionForm', '/categories/create')}>Отправить</Button>
                                </Form>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="12">
                                <Form id='exhibitionForm'>
                                    <FormGroup>
                                        <Label for="exhName">Name</Label>
                                        <Input type="text" name="name" id="exhName"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exhDescription">description</Label>
                                        <Input type="text" name="description" id="exhDescription"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exhImage">File</Label>
                                        <Input type="file" name="image" id="exhImage" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exhDate">Date</Label>
                                        <Input type="date" name="date" id="exhDate"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exhTime">Time</Label>
                                        <Input type="time" name="time" id="exhTime"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exhPrice">Price</Label>
                                        <Input type="number" name="price" id="exhPrice"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exhAddr">Address</Label>
                                        <Input type="text" name="address" id="exhAddr"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exhWeekday">weekday</Label>
                                        <Input type="text" name="weekday" id="exhWeekday"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exhCateg">categorie</Label>
                                        <Input type="number" name="categories" id="exhCateg"/>
                                    </FormGroup>
                                    <Button onClick={() => MuseamService.setItem('#exhibitionForm', '/exhibition/create')}>Отправить</Button>
                                </Form>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="3">
                        <Row>
                            <Col sm="12">
                                <Form id='picForm'>
                                    <FormGroup>
                                        <Label for="picName">Name</Label>
                                        <Input type="text" name="name" id="addName"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="picAuthor">author</Label>
                                        <Input type="text" name="author" id="picAuthor"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="picDescription">description</Label>
                                        <Input type="text" name="description" id="picDescription"/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="picImage">image</Label>
                                        <Input type="file" name="image" id="picImage" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for='picCategories'>Categories</Label>
                                        <Input 
                                            type="select" 
                                            name="categories" 
                                            id="picCategories"
                                            multiple
                                        >
                                            {collectionsOptions}
                                        </Input>
                                    </FormGroup>
                                    <Button onClick={() => MuseamService.setItem('#picForm', '/pictures/create')}>Отправить</Button>
                                </Form>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </Container>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        collections: state.collections,
        loadingCollections: state.loadingCollections
    }
};

export default WithMuseamService()(connect(mapStateToProps, actions)(AdminControl));