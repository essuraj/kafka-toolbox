<template>
    <div>
        <ui-toolbar :title="connections"
                    brand="kafka-toolbox"
                    :raised="false">
            <div slot="actions">
                <ui-icon-button color="black"
                                icon="developer_board"
                                size="large"
                                type="secondary"
                                @click="openModal('connect')"></ui-icon-button>
            </div>
        </ui-toolbar>
        <ui-modal ref="connect"
                  size="small"
                  title="Connect to kafka">
            <ui-textbox label="Zookeeper host:port"
                        placeholder="host:port"
                        v-model="url"></ui-textbox>
            <ui-alert v-show="isConnected===true"
                      :dismissible="false"
                      :type="status">
                {{data.message}}
            </ui-alert>
            <div slot="footer">
                <ui-button type="secondary"
                           size="small"
                           color="primary"
                           @click="test">Test</ui-button>
                <ui-button type="secondary"
                           size="small"
                           color="green"
                           @click="closeModal('connect')">Save</ui-button>
            </div>
        </ui-modal>
    </div>
</template>
<script>
import {
    ipcRenderer
} from 'electron'
export default {
    data() {
        return {
            isConnected: undefined,
            connections: "",
            status: undefined,
            url: 'localhost:2181',
            data: { messaage: "", success: false }
        }

    },
    methods: {
        openModal(ref) {
            this.$refs[ref].open();
        },
        closeModal(ref) {
            this.$refs[ref].close();
        },
        test() {
            let op = ipcRenderer.sendSync('test', this.url);
            this.isConnected = op.success;
            this.status = this.isConnected === true ? 'success' : 'error'
            this.data = op;
            console.log(op)
            this.connections = `${op.data[0][0].host}:${op.data[0][0].port}`

            this.$emit('status', op);

        }
    },
    //  components: {
    //         UiButton,
    //         UiModal,
    //         UiTab,
    //         UiTabs
    //     },
    name: 'nav-bar'
}

</script>