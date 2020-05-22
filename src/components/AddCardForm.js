import React from "react";
import {Form, Input, Button, Select, Upload} from 'antd';

const {Option} = Select;

class AddCardForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    onSubmit = values => {
        this.setState({loading: true});
        const {closeModel} = this.props
        setTimeout(() => {
            this.setState({loading: false});
            console.log('Success:', values);
            closeModel();
        }, 3000);


    }
    onSubmitFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    render() {
        const {loading} = this.state
        const layout = {
            labelCol: {span: 8},
            wrapperCol: {span: 16},
        };
        const emailRules = [
            {
                type: 'email',
                message: 'The input is not valid E-mail!',
            },
            {
                required: true,
                message: 'Please input your E-mail!',
            },
        ]
        const phoneNumberRules = [{
            required: true,
            message: 'Please input your phone number!',
        },
        ]
        const normFile = e => {
            console.log('Upload event:', e);

            if (Array.isArray(e)) {
                return e;
            }

            return e && e.fileList;
        };
        const prefixSelector = (
            <Form.Item name="prefix" noStyle>
                <Select
                    style={{
                        width: 70,
                    }}
                >
                    <Option value="1">+1</Option>
                    <Option value="86">+86</Option>
                </Select>
            </Form.Item>
        );
        return (
            <Form {...layout}
                  name="basic-info"
                  initialValues={{
                      prefix: '1',
                      education: 'bachelor'
                  }}
                  onFinish={this.onSubmit}
                  onFinishFailed={this.onSubmitFailed}
            >
                <Form.Item name="name" label="Name" rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={emailRules}>
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={phoneNumberRules}
                >
                    <Input
                        addonBefore={prefixSelector}
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="education"
                    label="Education"
                >
                    <Select>
                        <Option value="bachelor">Bachelor</Option>
                        <Option value="master">Master</Option>
                        <Option value="doctor">PhD</Option>
                        <Option value="none">None</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="comment" label="comment">
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item label="Resume">
                    <Form.Item name="resume" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                        <Upload.Dragger name="files" action="/upload.do">
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
                <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default AddCardForm;