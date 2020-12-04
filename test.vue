import {
    Row,
    Col,
    Layout,
    Input,
    Select,
    Button,
    Table,
    Modal,
    message,
    Spin
} from '@meitu/mtue/next';
import { Fragment } from 'vue-fragment';
import { mapState, mapActions } from 'vuex';
import styles from '../styles.scss?module';
import _ from 'lodash';
import NextStoreMixin from '@/mixins/next-component-bind';
import { deleteRole } from '@/next/api/role';

export default {
    name: 'Role',
    mixins: [NextStoreMixin],

    data() {
        return {
            options: [],
            selectedProjectValue: null,
            searchList: [],
            newRole: false,
            spinning: false,
            warn: {
                show: false,
                title: '',
                row: null
            }
        };
    },

    computed: {
        ...mapState('project', { projectList: 'list' }),
        ...mapState('role', ['roleList']),

        //下拉列表的第一个项目ID
        firstProjectId() {
            if (this.projectList[0]) {
                return this.projectList[0].id;
            }
            return null;
        },

        tableColumns() {
            return [
                { title: '角色名称', dataIndex: 'name' },
                { title: '描述', dataIndex: 'desc' },
                { title: '成员', dataIndex: 'membersCount', width: '150px' },
                { title: '创建人', dataIndex: 'creator', width: '200px' },
                {
                    title: '操作',
                    dataIndex: '',
                    width: '300px',
                    render: (text, record) => {
                        const { toDetail, toEdit, toDelete } = this;
                        return (
                            <Fragment>
                                <Button
                                    size="small"
                                    icon="view"
                                    class={styles.btnStyle}
                                    onClick={() => toDetail(record)}
                                >
                                    查看
                                </Button>
                                {record.creator !== '系统管理员' ? (
                                    <Fragment>
                                        <Button
                                            size="small"
                                            icon="delete1"
                                            class={styles.btnStyle}
                                            onClick={() => toEdit(record)}
                                        >
                                            编辑
                                        </Button>
                                        <Button
                                            size="small"
                                            type="danger"
                                            icon="delete1"
                                            onClick={() => toDelete(record)}
                                        >
                                            删除
                                        </Button>
                                    </Fragment>
                                ) : null}
                            </Fragment>
                        );
                    }
                }
            ];
        }
    },

    created() {
        this.loadList();
    },

    methods: {
        ...mapActions('project', ['getProjects']),
        ...mapActions('role', ['getRoles']),

        async loadList() {
            const { getProjects, getRoles, firstProjectId, $route } = this;

            await getProjects();
            this.selectedProjectValue = Number(
                $route.query.selectedProjectValue
            );
            this.spinning = true;
            if (this.selectedProjectValue) {
                await getRoles({ id: this.selectedProjectValue });
            } else if (firstProjectId) {
                this.selectedProjectValue = firstProjectId;
                await getRoles({ id: firstProjectId });
            }

            this.searchList = this.roleList;
            this.options = _.map(this.projectList, project => {
                let { name, id } = _.pick(project, ['name', 'id']);
                return { label: name, value: id };
            });
            this.spinning = false;
        },

        // 项目下拉项重新拼装
        changeOption() {
            this.options = _.map(this.projectList, project => {
                let { name, id } = _.pick(project, ['name', 'id']);
                return { label: name, value: id };
            });
        },

        // 更改项目重新设置角色列表
        handleChangeProject(value) {
            const { getRoles, changeOption } = this;
            this.selectedProjectValue = value;
            this.spinning = true;
            getRoles({ id: value }).then(() => {
                this.searchList = this.roleList;
                this.spinning = false;
            });
            changeOption();
        },

        onSearchRole(val) {
            this.searchList = _.filter(this.roleList, role =>
                _.includes(role.name, val)
            );
        },

        onSearchProject(val) {
            let { changeOption } = this;
            this.options = _.map(
                _.filter(this.projectList, project =>
                    _.includes(project.name, val)
                ),
                project => {
                    let option = _.pick(project, ['id', 'name']);
                    return { label: option.name, value: option.id };
                }
            );
            if (_.isEmpty(this.options)) {
                changeOption();
            }
        },

        onNewRole() {
            const { $router, selectedProjectValue } = this;
            $router.push({
                path: `/admin/role/edit/`,
                query: {
                    newRole: true,
                    selectedProjectValue
                }
            });
        },

        toDetail(record) {
            const { $router, selectedProjectValue } = this;
            const query = {
                newRole: false,
                selectedProjectValue,
                roleId: record.id
            };
            $router.push({ path: '/admin/role/detail/', query });
        },

        toEdit(record) {
            const { $router, selectedProjectValue } = this;
            $router.push({
                path: `/admin/role/edit/${record.id}`,
                query: {
                    newRole: false,
                    selectedProjectValue,
                    roleId: record.id
                }
            });
        },

        toDelete(record) {
            let { warn } = this;
            warn.show = true;
            warn.title = `确认删角色 ${record.name} 吗?`;
            warn.row = record;
        },

        async handleDelete() {
            const id = this.warn.row.id;
            this.spinning = true;
            await deleteRole(id);
            this.warn.show = false;
            message.success('删除成功!');
            await this.getRoles({ id: this.warn.row.projectGroupId });
            this.searchList = this.roleList;
            this.spinning = false;
        },

        onCancelModal() {
            this.warn.show = false;
            this.warn.row = null;
        }
    },

    render() {
        const {
            selectedProjectValue,
            onSearchProject,
            handleChangeProject,
            onSearchRole,
            onNewRole,
            spinning,
            searchList,
            handleDelete,
            onCancelModal
        } = this;

        return (
            <Layout>
                <Row class={styles.editHead}>
                    <Col span={10}>
                        <label class={styles.searchLabel}>项目名称:</label>
                        <Select
                            show-search
                            class={styles.projectSelect}
                            options={this.options}
                            filterOption={false}
                            placeholder="请输入"
                            border-theme="underline"
                            value={selectedProjectValue}
                            onSearch={onSearchProject}
                            onChange={handleChangeProject}
                        />
                    </Col>
                    <Col span={10}>
                        <label class={styles.searchLabel}>角色名称:</label>
                        <Input
                            class={styles.projectInput}
                            border-theme="underline"
                            placeholder="请输入"
                            onChange={onSearchRole}
                        ></Input>
                    </Col>
                    <Col span={4} class={styles.addBtn}>
                        <Button type="primary" icon="plus" onClick={onNewRole}>
                            添加新角色
                        </Button>
                    </Col>
                </Row>
                <Spin spinning={spinning}>
                    <Table
                        rowKey={record => {
                            return record.id;
                        }}
                        class={styles.edit}
                        columns={this.tableColumns}
                        dataSource={searchList.length > 0 ? searchList : []}
                        pagination={false}
                        bordered
                    />
                </Spin>
                <Modal
                    visible={this.warn.show}
                    title={this.warn.title}
                    onOk={handleDelete}
                    onCancel={onCancelModal}
                >
                    拥有该角色的人群将失去该权限！
                </Modal>
            </Layout>
        );
    }
};