// Backend service for ChainGuard AI
import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

// Your canister ID from dfx output
const CANISTER_ID = 'uxrrr-q7777-77774-qaaaq-cai';

// Backend interface definition (IDL) - Updated to match your exact Rust backend
const idlFactory = ({ IDL }) => {
  const LogEntry = IDL.Record({
    'id': IDL.Nat64,
    'countermeasure': IDL.Opt(IDL.Text),
    'result': IDL.Text,
    'action': IDL.Text,
    'value': IDL.Float32,
    'user': IDL.Principal,
    'timestamp': IDL.Nat64,
  });

  return IDL.Service({
    'get_logs': IDL.Func([], [IDL.Vec(LogEntry)], ['query']),
    'add_log': IDL.Func([IDL.Text, IDL.Float32, IDL.Text, IDL.Principal], [IDL.Bool], []),
    'trigger_countermeasure': IDL.Func([IDL.Nat64], [IDL.Text], []),
  });
};

class BackendService {
  constructor() {
    this.actor = null;
    this.agent = null;
    this.isInitialized = false;
  }

  async initialize() {
    try {
      this.agent = new HttpAgent({ host: 'http://127.0.0.1:4943' });
      await this.agent.fetchRootKey();
      this.actor = Actor.createActor(idlFactory, {
        agent: this.agent,
        canisterId: CANISTER_ID,
      });
      const testLogs = await this.actor.get_logs();
      if (!Array.isArray(testLogs)) throw new Error('Invalid get_logs return type');
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Backend init error:', error);
      this.isInitialized = false;
      return false;
    }
  }

  async getLogs() {
    try {
      if (!this.isInitialized) await this.initialize();
      const logs = await this.actor.get_logs();
      const arr = Array.isArray(logs) ? logs : [];
      return arr.map((log) => ({
        id: Number(log.id),
        action: log.action,
        value: Number(log.value),
        result: log.result,
        user: log.user.toString(),
        timestamp: new Date(Number(log.timestamp) * 1000),
        status: log.result === 'Safe' ? 'Success' : 'Blocked',
        countermeasure: log.countermeasure?.[0] ?? null,
      }));
    } catch (error) {
      console.error('getLogs error:', error);
      throw error;
    }
  }

  async addLog(action, value, result, userPrincipal) {
    try {
      if (!this.isInitialized) await this.initialize();
      const principal = Principal.fromText(userPrincipal);
      const [success] = await this.actor.add_log(action, parseFloat(value), result, principal);
      return success;
    } catch (error) {
      console.error('addLog error:', error);
      throw error;
    }
  }

  async triggerCountermeasure(logId) {
    try {
      if (!this.isInitialized) await this.initialize();
      const [result] = await this.actor.trigger_countermeasure(BigInt(logId));
      return result;
    } catch (error) {
      console.error('triggerCountermeasure error:', error);
      throw error;
    }
  }

  async isBackendHealthy() {
    try {
      if (!this.isInitialized) await this.initialize();
      const logs = await this.actor.get_logs();
      return Array.isArray(logs);
    } catch {
      return false;
    }
  }

  async testConnection() {
    try {
      const testAgent = new HttpAgent({ host: 'http://127.0.0.1:4943' });
      await testAgent.fetchRootKey();
      const testActor = Actor.createActor(idlFactory, {
        agent: testAgent,
        canisterId: CANISTER_ID,
      });
      const logs = await testActor.get_logs();
      return { success: true, logs, count: logs.length };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  getConnectionStatus() {
    return {
      isInitialized: this.isInitialized,
      hasActor: !!this.actor,
      hasAgent: !!this.agent,
      canisterId: CANISTER_ID
    };
  }
}

export const backendService = new BackendService();
export default backendService;
